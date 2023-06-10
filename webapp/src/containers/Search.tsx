import { Alert, message, notification, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { isNil } from "lodash";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { VisitorDto } from "../@generated/schemas";
import { useVisitorsControllerSearch, useVisitorsControllerVisit } from "../@generated/visitors/visitors";
import { UserSearchForm } from "../components/UserSearchForm";

export interface ISearchProps {
    size?: 'large' | 'small'
}

export interface ISearchRef {
    reset(): void;
}

export const Search = forwardRef(({ size }: ISearchProps, ref: Ref<ISearchRef>) => {
    const [search, setSearch] = useState<string>('');
    const [isOk, setIsOk] = useState<boolean | null>();

    const reset = () => {
        setIsOk(null);
        setSearch('');
    }

    const { t } = useTranslation();
    useImperativeHandle<ISearchRef, ISearchRef>(ref, () => ({ reset }));

    const visit$ = useVisitorsControllerVisit({
        mutation: {
            async onSuccess(isOk: any) {
                setSearch('');
                setIsOk(isOk);

                if(isOk) {
                    await notification.success({
                        placement: 'bottom',
                        message: t('Visit created'),
                    });
                } else {
                    await notification.error({
                        placement: 'bottom',
                        message: t(`Can not create visit - no duplicates`),
                    });
                }
            }
        }
    })

    const users$ = useVisitorsControllerSearch({ name: search }, { 
        query: { 
            enabled: !!search,
        }
    });

    const onVisitorSelect = (user: VisitorDto) => {
        visit$.mutateAsync({ visitorId: user.id });
    }

    if(!isNil(isOk)) {
        return (
            <Alert 
                type={isOk ? 'success' : 'warning'}
                description={isOk ? t('User can have a lunch') : t('User already had a lunch')}
            />
        )
    }

    return (
        <Spin spinning={users$.isLoading}>
            <UserSearchForm
                size={size}
                onSearch={setSearch} 
                visitors={users$.data || []} 
                onVisitorSelect={onVisitorSelect} 
            />
        </Spin>
    );
})