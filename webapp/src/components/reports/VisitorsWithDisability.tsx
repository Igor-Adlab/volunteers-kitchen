import { useMemo } from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { VisitorDto } from "../../@generated/schemas";

export function VisitorsWithDisability({ visitors }: { visitors: VisitorDto[] }) {
    const { t } = useTranslation();

    const withDisability = useMemo(() => visitors.filter(({ hasDisability }) => hasDisability), [visitors]);

    const malesWithDisability = useMemo(() => withDisability.filter(({ gender }) => gender === 'Male'), [withDisability]);
    const femalesWithDisability = useMemo(() => withDisability.filter(({ gender }) => gender === 'Female'), [withDisability]);

    const overlay = useMemo(() => (
        <>
            <span>{t('Male')}: {malesWithDisability.length}</span>
            {' | '}
            <span>{t('Female')}: {femalesWithDisability.length}</span>
        </>
    ), [t, malesWithDisability, femalesWithDisability]);

    return (
        <Tooltip overlay={overlay} className="cursor-pointer">
            <InfoCircleOutlined className="mr-1" />
            <span className="font-bold">{t("with_disability")}:</span>{" "}
            <span>{withDisability.length}</span>
        </Tooltip>
    )
}