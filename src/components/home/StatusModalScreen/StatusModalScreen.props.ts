export interface StatusModalScreenProps {
    onPressExpression: (expression: string) => void;
    onPressClearStatus: () => void;
}

export interface ExpressionInterface {
    id: number;
    expression: string;
}
