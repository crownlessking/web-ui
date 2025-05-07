import { styled } from '@mui/material';
import StatePage from '../../controllers/StatePage';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';

interface IProps {
  def: StatePage;
}

const CustomChip = styled('div')(() => ({
  height: 40,
  borderRadius: '20px',
  backgroundColor: grey['100']
}));

/**
 * [TODO] Make sure to implement session logic server side so that the required
 *        session information is return by the server which you can then use to
 *        display using this component.
 * Displays the user's email on the appbar when they are logged-in.
 */
export default function StateJsxSignedIn({ def: page }: IProps) {
  const net = page.parent.parent.net;
  const { sessionValid, name } = net;
  return sessionValid ? (
    <CustomChip>
      { name }
      <Avatar>{ name.charAt(0).toUpperCase() }</Avatar>
    </CustomChip>
  ) : ( null );
}
