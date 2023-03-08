import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'

export default function Modal({
  open, onClose, children, ...props
}){
  return <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    {...props}
  >
    <Fade in={open}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 5,
        boxShadow: 24,
        p: 2,
      }}>
        {children}
      </Box>
    </Fade>
  </Modal>
}
