import React, { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { 
  currentUserState,
  leftDrawerWidthState,
  openRegisterState, 
  windowDimensionsState 
} from "./atoms/globalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Login from "./pages/system.module/user/Login";
import NavBar from "./components/layout/navbar/NavBar";
import Notification from "./components/global/Notification";
import Loading from "./components/global/Loading";
import { getWindowDimensions } from "./utils/windowUtil";
import LeftDrawer from "./components/layout/drawer/LeftDrawer";
import SystemRouters from "./routers/SystemRouters";
import { indigo } from "@mui/material/colors";

const Register = React.lazy(()=>import('./pages/system.module/user/Register'))

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[600],
    },
    mode: 'light',
  },
});

function App() {

  const currentUser = useRecoilValue(currentUserState)
  const openRegister = useRecoilValue(openRegisterState)
  const setWindowDimensions = useSetRecoilState(windowDimensionsState);

  const leftDrawerWidth = useRecoilValue(leftDrawerWidthState);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setWindowDimensions])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <NavBar />
          <React.Suspense fallback={<Login loading={true}/>}>
            {currentUser 
              ? <BrowserRouter>
                  <SystemRouters/>
                </BrowserRouter>
              : openRegister ? <Register /> : <Login />
            }
          </React.Suspense>
          <LeftDrawer drawerWidth={leftDrawerWidth}/>
          <Loading/>
          <Notification/>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
