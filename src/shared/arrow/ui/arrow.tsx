import { Box } from '@mui/material'

export const Arrow = ({ isUp }: { isUp: boolean }) => {
	return (
		<Box sx={{ marginLeft: 1, transform: `rotate(${isUp ? 180 : 0}deg)` }}>
			<img src={'/icons/arrow.svg'} />
		</Box>
	)
}
