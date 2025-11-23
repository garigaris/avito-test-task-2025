export const ItemStats = ({ stats }: { stats: { [key: string]: string } }) => {
  return (
    <div>
        <h3>Характеристики</h3>
      {Object.entries(stats).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
};