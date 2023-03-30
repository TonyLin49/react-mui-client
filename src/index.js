import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {RecoilRoot} from 'recoil'
//import 'default-passive-events'
//import SignaturePad from './components/user/signature/SignaturePad';
import App from './App';
// import HookDynamicForm from './components/dynaHookForm/HookDynamicForm';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  //<React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* <HookDynamicForm showResetButton={true}/> */}
        <App/>
        {/* <SignaturePad /> */}
      </RecoilRoot>
    {process.env.NODE_ENV==='development' 
      && <ReactQueryDevtools></ReactQueryDevtools>
    }
    </QueryClientProvider>
  //</React.StrictMode>
);
