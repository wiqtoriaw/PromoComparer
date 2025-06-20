import { CardContent, Typography, Box, Chip } from '@mui/material';
import { formatDate } from '../../../utilities/formatDate'; // <-- nowy import

export default function PromotionCardDetails({ promotion, discountAmount, expired }) {
  const start = formatDate(promotion.startDate);
  const end = formatDate(promotion.endDate);

  let okres;
  if (start && end) okres = `${start} – ${end}`;
  else if (start && !end) okres = `${start} – Brak informacji`;
  else if (!start && end) okres = `Brak informacji – ${end}`;
  else okres = 'Brak informacji';

  return (
    <CardContent sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
        {promotion.priceAfterPromotion != null && (
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            {promotion.priceAfterPromotion.toFixed(2)} zł
          </Typography>
        )}
        {promotion.originalPrice != null && (
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'line-through',
              color: 'text.disabled',
              fontWeight: 500,
              ml: 1
            }}
          >
            {promotion.originalPrice.toFixed(2)} zł
          </Typography>
        )}
        {discountAmount && (
          <Chip
            label={`-${discountAmount} zł`}
            color="success"
            size="small"
            sx={{ ml: 1, fontWeight: 600 }}
          />
        )}
        {promotion.discountPercent != null && (
          <Chip
            label={`-${promotion.discountPercent}%`}
            color="secondary"
            size="small"
            sx={{ ml: 1, fontWeight: 600 }}
          />
        )}
      </Box>
      <Typography variant="body2" color="text.secondary">
        <strong>Okres:</strong> {okres}
      </Typography>
      {promotion.untilOutOfStock !== undefined && (
        <Typography variant="body2" color="text.secondary">
          <strong>Do wyczerpania zapasów:</strong> {promotion.untilOutOfStock ? '✔️' : '❌'}
        </Typography>
      )}
      {expired && (
        <Chip label="Zakończona" color="warning" sx={{ mt: 1, fontWeight: 600 }} />
      )}
    </CardContent>
  );
}
