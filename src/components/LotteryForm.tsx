import { Card, CardContent, TextField, Typography } from '@material-ui/core'
import Alert, { Color } from '@material-ui/lab/Alert'
import { Field, Formik, FormikProps } from 'formik'
import React, { ReactElement } from 'react'
import { useFetchInitialData } from '../contexts/UserContext'
import lottery from '../utils/lottery'
import web3 from '../utils/web3'

export default function LotteryForm(): ReactElement {
  const fetchInitialData = useFetchInitialData()
  return (
    <Formik
      initialValues={{
        ethValue: 0.000,
        loading: false,
        message: undefined as {message:string, severity:Color} | undefined,
      }}
      onSubmit={async (values, actions) => {
        try {
          console.log('submit')
          const accounts = await web3.eth.getAccounts()
          actions.setFieldValue('loading', true)
          actions.setFieldValue('message', { message: 'Waiting on transaction success...', severity: 'info' })
          await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(`${values.ethValue}`, 'ether'),
          })
          actions.setFieldValue('loading', false)
          actions.setFieldValue('message', { message: 'You have being entered to the lottery!', severity: 'success' })
          await fetchInitialData()

        } catch (error) {
          actions.setFieldValue('loading', false)
          actions.setFieldValue('message', { message: 'Error!', severity: 'error' })
        }
      }}
    >
      {(formikProps:FormikProps<any>) => {
        const { values } = formikProps
        return (
          <Card>
            <CardContent>
              <form onSubmit={formikProps.handleSubmit}>
                <Typography variant="h4" component="h2">Want to try your luck</Typography>
                {values.message && <Alert severity={values.message.severity}>{values.message.message}</Alert>}
                <Typography variant="body1" component="p">Enter to our eth lottery</Typography>
                <Field
                  as={TextField}
                  type="number"
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  inputProps={{
                    step: '0.01',
                    min: 0,
                  }}
                  name="ethValue"
                  label="Amount of ether to enter"
                  disabled={!!formikProps.values.loading}
                />
              </form>
            </CardContent>
          </Card>
        )
      }}
    </Formik>
  )
}
