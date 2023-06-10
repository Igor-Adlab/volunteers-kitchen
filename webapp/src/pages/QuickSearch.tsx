import { Button } from "antd";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MobileForm } from "../containers/MobileForm";
import { ISearchRef, Search } from "../containers/Search";

export interface IQuickSearchPageProps {
  size?: "large" | "small";
}

export function QuickSearchPage({
  size = "large",
}: IQuickSearchPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate()
    const search$ = useRef<ISearchRef>(null);

    const onNewSearch = () => {
        if(search$.current) {
            search$.current.reset();
        }
    };

  return (
    <MobileForm>
      <Search ref={search$} size={size} />
      <br />
      <Button.Group className="w-full">
        <Button size={size} block onClick={() => navigate('/registration')}>
          {t('New visitor')}
        </Button>
        <Button size={size} block onClick={onNewSearch}>
          {t('New search')}
        </Button>
      </Button.Group>
      <br />
      <br />
      <Button.Group className="w-full">
      <Button type="link" size={size} block onClick={() => navigate('/stats/daily')}>
          {t('Daily report')}
        </Button>
        <Button type="link" size={size} block onClick={() => navigate('/stats')}>
          {t('Extended report')}
        </Button>
        <Button type="link" size={size} block onClick={() => navigate('/stats/monthly')}>
          {t('Monthly report')}
        </Button>
        <Button type="link" size={size} block onClick={() => navigate('/stats/extended/monthly')}>
          {t('Extended monthly report')}
        </Button>
      </Button.Group>
    </MobileForm>
  );
}
