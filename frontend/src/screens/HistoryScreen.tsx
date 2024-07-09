import { History } from "../features/user/components/History";
import { useClaimHistory } from "../features/user/hooks/useUser";
import EmptyBox from "../shared/components/EmptyBox";
import Loading from "../shared/components/Loading";

export const HistoryScreen = () => {
  const { data: histories, isLoading } = useClaimHistory();

  if (isLoading) return <Loading />;

  if (!histories || histories.length === 0)
    return (
      <EmptyBox>
        <p>You don''t have any history yet.</p>
      </EmptyBox>
    );
  return (
    <div className="history">
      {histories.map((item, idx) => {
        return <History cart={item} key={idx} />;
      })}
    </div>
  );
};
