import { Response } from 'express';

export type ApiResponse = TypedResponse<{
	data: IData;
	message: string;
	status: string;
}>;

interface IData {
	validation: {
		error: boolean;
		field: string;
		field_value: string;
		condition: string;
		condition_value: string;
	};
}

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
	json(data: T): TypedResponse<T>;
} & { status(code: number): TypedResponse<T> };
