export interface StatusModalScreenProps {
    onPressExpression: (expression: string) => void;
    onPressClearStatus: () => void;
    expression: string;
}

export interface ExpressionInterface {
    id: number;
    expression: string;
}
