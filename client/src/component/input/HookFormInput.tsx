import {FieldValues, Path, useWatch, Control, useFormState, Controller} from 'react-hook-form';

type InputProps<T extends FieldValues> = {
	// name은 폼 필드의 이름으로, FieldValues에서 가져온 Path 타입을 사용함.
	name: Path<T>;
	// control은 react-hook-form의 Control 타입으로, 폼의 상태를 관리하는데 사용됨.
	control: Control<T>;
	icon?: string;
};

export const HookFormInput = <T extends FieldValues>({name, icon, control}: InputProps<T>) => {
	// useWatch 훅을 사용하여 지정된 폼 필드의 값을 관찰함.
	const value = useWatch({
		control,
		name,
	});

	// useFormState 훅을 사용하여 폼의 에러 상태를 가져옴.
	const a = useFormState({
		control,
	});

	console.log(a);
	return (
		<>
			<div
				className={`flexCenter w-full gap-2 border-b-2 p-3 transition-colors duration-200 focus-within:border-additional3`}
			>
				{/* 아이콘이 제공되면 아이콘을 렌더링함. value 값에 따라 아이콘의 스타일이 변경됨. */}
				<i
					className={`ri-${icon} ri-lg ${value ? 'animate-tickle text-black' : 'text-slate-400'}`}
				/>

				{/* Controller 컴포넌트를 사용하여 입력 필드를 관리함. */}
				<Controller
					name={name}
					control={control}
					render={({field}) => (
						// 입력 필드를 렌더링하고, react-hook-form의 필드 속성을 적용함.
						<input {...field} className="flex-grow text-xs outline-none" placeholder={name} />
					)}
				/>
			</div>
			{/* 폼 필드에 에러가 있으면 에러 메시지를 렌더링함. */}
			{a.errors[name] && (
				<p className="warning my-1 animate-shake">{(a.errors[name] as any).message}</p>
			)}
		</>
	);
};
