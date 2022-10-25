import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from '@self.id/react'

import Routes from './Routes'
import AppError from 'app-shared/client/components/AppError'

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={AppError}>
      <Provider client={{ ceramic: 'testnet-clay' }}>
        <Routes/>
      </Provider>
    </ErrorBoundary>
  )
}
