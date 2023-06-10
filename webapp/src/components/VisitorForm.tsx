import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import { VisitorDto } from "../@generated/schemas";
import moment from "moment";
import dayjs from "dayjs";

export interface IVisitorFormProps {
  size?: "large" | "small";
  isLoading: boolean;
  onFinish(data: any): void;
  values?: VisitorDto;
}

export function VisitorForm({
  onFinish,
  isLoading = false,
  size = "large",
  values,
}: IVisitorFormProps) {
  const { t } = useTranslation();
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item
            label={t("Name")}
            name="name"
            required
            initialValue={values?.name}
            rules={[{ required: true }]}
          >
            <Input size={size} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label={t("Birthday")}
            name="birthday"
            required
            rules={[{ required: true }]}
            initialValue={values?.birthday ? dayjs(values?.birthday) : null}
            help={values?.birthday ? `Prev: ${dayjs(values?.birthday).format('DD.MM.YYYY')}` : null}
          >
            <DatePicker format="DD.MM.YYYY" size={size} className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={t("Gender")}
            name="gender"
            required
            rules={[{ required: true }]}
            initialValue={values?.gender}
          >
            <Select className="w-full" size={size}>
              <Select.Option value="Male">{t("Male")}</Select.Option>
              <Select.Option value="Female">{t("Female")}</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={t("Status")}
            name="status"
            required
            rules={[{ required: true }]}
            initialValue={values?.status}
          >
            <Select className="w-full" size={size}>
              <Select.Option value="Local">{t("Local")}</Select.Option>
              <Select.Option value="Refugee">{t("Refugee")}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="hasDisability"
        valuePropName="checked"
        initialValue={values?.hasDisability || false}
      >
        <Checkbox>{t("hasDisability")}</Checkbox>
      </Form.Item>
      <Form.Item className="text-right">
        <Button disabled={isLoading} block type="primary" size={size} htmlType="submit">
          {t("Save")}
        </Button>
      </Form.Item>
    </Form>
  );
}
