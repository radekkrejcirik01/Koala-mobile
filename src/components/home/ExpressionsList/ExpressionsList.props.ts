import { ExpressionDataInterface } from '@interfaces/general.interface';

export interface ExpressionsListProps {
    data: ExpressionDataInterface[];
    status: string;
    onStatusPress: () => void;
    onStatusReply: (value: ExpressionDataInterface) => void;
}
