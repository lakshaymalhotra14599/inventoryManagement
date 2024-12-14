import { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Skeleton, Box } from '@mui/material';
import { cardData, CardData } from '../constants/statsConfig';
import { useRoleContext } from '../hooks/useRoleContext';

const StatsCards = () => {
  const { state } = useRoleContext();
  const { inventory } = state;
  const { data, loading, totalStoreValue, outOfStock, categories } = inventory;

  useEffect(() => {}, [totalStoreValue, outOfStock, categories]);

  const renderCard = ({
    text,
    lookupKey,
    value,
    icon,
    className,
    key,
  }: CardData) => {
    // @ts-expect-error err
    const cardValue = inventory[lookupKey] ?? data.length;

    return (
      <Grid item xs={12} sm={6} md={3} key={key} sx={{ mb: 2 }}>
        <Card className={className}>
          <CardContent>
            <Typography variant="h6">{text}</Typography>
            <Box display="flex" alignItems="center">
              {icon && <Box mr={1}>{icon}</Box>}
              <Typography variant="h4">{value(cardValue)}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ mb: 2 }}>
            <Card>
              <CardContent>
                <Skeleton variant="text" height={40} width="60%" />
                <Skeleton variant="rectangular" height={80} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {cardData.map((card) => renderCard({ ...card, lookupKey: card.lookupKey }))}
    </Grid>
  );
};

export default StatsCards;
