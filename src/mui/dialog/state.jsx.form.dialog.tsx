import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import StateDialogForm from '../../controllers/templates/StateDialogForm';
import { AppDispatch, RootState } from '../../state';
import StateJsxDialogAction from './actions/state.jsx.form';
import FormContent from '../../components/content/form.component';

interface IDialogForm { def: StateDialogForm; }

export default function StateJsxDialogForm({ def: dialog }: IDialogForm) {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => state.dialog.open ?? false);

  const handleDialogTitleClose = () => dispatch({ type: 'dialog/dialogClose' });
  const handleClose = (_e: any, reason: any) => {
    // Clicking on the backdrop no longer close the dialog
    if (reason && reason === "backdropClick")
        return;
    dispatch({ type: 'dialog/dialogClose' });
  }

  return (
    <Dialog {...dialog.props} open={open} onClose={handleClose}>
      <DialogTitle {...dialog.titleProps}>
        { dialog.title }
        <IconButton
          aria-label="close"
          onClick={handleDialogTitleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent {...dialog.contentProps}>
        {dialog.contentText ? (
          <DialogContentText {...dialog.contentTextProps}>
            { dialog.contentText }
          </DialogContentText>
        ): ( null )}
        <FormContent
          type='dialog'
          def={dialog.form}
          formName={dialog.contentName}
        />
      </DialogContent>
      {dialog.form && dialog.actions.length > 0 ? (
        <DialogActions>
          <StateJsxDialogAction def={dialog.actions} parent={dialog.form} />
        </DialogActions>
      ) : ( null )}
    </Dialog>
  );
}
