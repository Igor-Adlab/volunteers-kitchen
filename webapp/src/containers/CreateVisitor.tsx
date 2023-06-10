import { message } from "antd";

import { NewVisitorDto } from "../@generated/schemas";
import { VisitorForm } from "../components/VisitorForm";
import { useVisitorsControllerCreate } from "../@generated/visitors/visitors";
import { useTranslation } from "react-i18next";
import moment from "moment";

export interface ICreateVisitorProps {
  onVisitorCreated?(visitor: NewVisitorDto): void;
}

export function CreateVisitor({ onVisitorCreated }: ICreateVisitorProps) {
  const { t } = useTranslation();
  const create$ = useVisitorsControllerCreate({
    mutation: {
      onSuccess: async (visitor) => {
        message.success(t(`New visitor created`));

        if (onVisitorCreated) {
          onVisitorCreated(visitor);
        }
      },
    },
  });

  const onFinish = ({ birthday, ...values }: any) => {
    const formatted = moment(birthday.format("DD.MM.YYYY"), "DD.MM.YYYY")
      .startOf("day")
      .utcOffset(0, true)
      .format("YYYY-MM-DDTHH:mm:ss");

    create$.mutateAsync({
      data: {
        ...values,
        birthday: formatted,
      },
    });
  };

  return <VisitorForm onFinish={onFinish} isLoading={create$.isLoading} />;
}
