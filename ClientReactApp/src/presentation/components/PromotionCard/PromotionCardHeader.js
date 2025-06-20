import { CardHeader, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import useAuth from '../../../application/hooks/useAuth';

export default function PromotionCardHeader({ promotion, isFavourite, onFavouriteToggle }) {
  const { user } = useAuth();

  return (
    <CardHeader
      action={
        user && (
          <Tooltip title={isFavourite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}>
            <IconButton onClick={onFavouriteToggle}>
              {isFavourite ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        )
      }
      title={
        <Typography
          variant="h6"
          sx={{
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            whiteSpace: 'normal',
            display: 'block',
            maxWidth: '100%'
          }}
        >
          {promotion.productName}
        </Typography>
      }
      subheader={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {promotion.storeName}
          </Typography>
          {promotion.requiredApp && (
            <Chip label="Aplikacja" size="small" color="info" />
          )}
        </Box>
      }
      sx={{
        pb: 0,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    />
  );
}
