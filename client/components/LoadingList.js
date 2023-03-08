import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'

export default function LoadingList({
  loading,
  error,
  members,
  skeletonLength = 4,
  skeletonHeight = 118,
  skeletonWidth = 'auto',
  emptyMessage = `this list is empty.`,
  onEmpty = <EmptyMessage>{emptyMessage}</EmptyMessage>,
  onLoading = <SkeletonMembers {...{ skeletonLength, skeletonHeight, skeletonWidth }}/>,
}){
  return <List spacing={1}>{
    error ? <ErrorMessage {...{error}}/> :
    (!loading && members)
      ? members.length === 0
        ? onEmpty
        : members.map((m, index) => <ListMember {...{key: index, ...m}}/>)
      : onLoading
  }</List>
}

function EmptyMessage({ children }) {
  return <Typography
    sx={{textAlign: 'center', fontStyle: 'italic'}}
  >{children}</Typography>
}

function ListMember({ href, icon, text, subtext }){
  return <ListItem disablePadding sx={{mb: 1}}>
    <ListItemButton
      component={href ? Link : undefined}
      to={href}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText
        primary={text}
        secondary={subtext}
      />
    </ListItemButton>
  </ListItem>
}

function SkeletonMembers({
  skeletonLength, skeletonHeight, skeletonWidth
}){
  return Array(skeletonLength).fill().map((_, i) =>
    <Skeleton
      key={i}
      variant="rounded"
      height={skeletonHeight}
      width={skeletonWidth}
      sx={{mb: 1}}
    />
  )
}