import { AutoComplete, FormInstance } from "antd";
import { find, map } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NewVisitorDto, VisitorDto } from "../@generated/schemas";

export interface IUserSearchFormProps {
    visitors?: VisitorDto[];
    size?: 'large' | 'small';
    onSearch(name: string): void;
    onVisitorSelect(visitor: NewVisitorDto): void
}

export function UserSearchForm ({ onSearch, visitors, onVisitorSelect, size }: IUserSearchFormProps) {
    const { t } = useTranslation()
    const onSelect = (visitorId: string) => {
        const visitor = find(visitors, (visitor) => visitor.id === visitorId);
        if(visitor) {
            onVisitorSelect(visitor);
        }
    };

    const options = useMemo(() => map(visitors, visitor => ({ label: visitor.name, value: visitor.id })), [visitors]);

    return (
        <AutoComplete
            size={size}
            className="w-full"
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder={t('Enter name')}
        />
    )
}