import Typography from '@mui/material/Typography'

export default function Heading({
  variant = 'main',
  children,
  underlined,
  centered,
  ...props
}){
  const sx = {}
  if (variant === 'major'){
    variant = 'h3'
  }
  if (variant === 'main'){
    variant = 'h4'
  }
  if (variant === 'minor'){
    variant = 'h5'
  }
  if (variant === 'sub'){
    variant = 'h6'
  }
  if (underlined){
    sx.borderBottom = 1
    sx.borderColor = 'divider'
  }
  if (centered){
    sx.textAlign = 'center'
  }
  return <Typography {...{
    variant,
    // mb: 2,
    ...props,
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      ...sx,
      ...props.sx,
    },
  }}>{children}</Typography>
}
