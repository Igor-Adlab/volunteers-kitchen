import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CreateVisitor } from "../containers/CreateVisitor";
import { MobileForm } from "../containers/MobileForm";

export interface IRegistrationPageProps {
    size?: 'large' | 'small';
}

export function Registration({ size = 'large' }: IRegistrationPageProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToSearch = () => navigate('/');

  return (
    <MobileForm>
      <CreateVisitor onVisitorCreated={goToSearch} />
      <br />
      <Button block onClick={goToSearch} size={size}>{t("Search user")}</Button>
    </MobileForm>
  );
}
