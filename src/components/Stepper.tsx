import * as React from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@mui/material';


interface IHoriz {
    shag:number
}

const HorizontalStepperWithError:React.FC<IHoriz> = ({shag}) => {
  const useStyles = makeStyles(() => ({
    root: {
      // "& .Mui-active": { color: "Gold" },
      "& .Mui-completed": { color: "green" },
      // "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
    }
  }));
  const c = useStyles();

  return (
    <Box sx={{ width: '100%',marginBottom:-2,marginTop:2 }}>
      <Stepper activeStep={shag} className={c.root} style={{background:'rgba(0,0,0,0)'}}>
            <Step>
              <StepLabel ><Typography style={{fontSize:10,color:'black'}}>Заполнение</Typography></StepLabel>
            </Step>
            <Step>
            <StepLabel ><Typography style={{fontSize:10}}>Проверка</Typography></StepLabel>
          </Step>
      </Stepper>
    </Box>
  );
}

export default HorizontalStepperWithError