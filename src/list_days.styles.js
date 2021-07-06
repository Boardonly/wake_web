import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	cell: {
		width: '14.2%',
		margin: '1px 0px',
	},
	btn: {
		borderRadius: 0,
		border: '1px solid #dfeffe',

		fontSize: '16px',
		'&:hover': {
			backgroundColor: '#dfeffe',
			zIndex: 2,
		},
	},
	hoverSelect: {
		backgroundColor: '#dfeffe',
	},
	selected: {
		backgroundColor: '#8fc8fe',
	},
	scheduled: {
		backgroundColor: '#34ebc0',
	},
	now: {
		color: '#ffae5a',
	},
	start: {
		borderTopLeftRadius: '15px',
		borderBottomLeftRadius: '15px',
		zIndex: 1,
	},
	end: {
		borderTopRightRadius: '15px',
		borderBottomRightRadius: '15px',
		zIndex: 1,
	}
}));

