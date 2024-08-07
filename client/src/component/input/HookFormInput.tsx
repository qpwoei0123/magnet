import {useState} from 'react';
import {FieldValues, Path, useWatch, Control, useFormState, Controller} from 'react-hook-form';

type UseHookFormInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
};

export const useHookFormInput = <T extends FieldValues>({
	name,
	control,
}: UseHookFormInputProps<T>) => {
	const [isVisible, setIsVisible] = useState(false);

	const value = useWatch({control, name});
	const {errors} = useFormState({control});

	const togglePasswordVisibility = () => {
		setIsVisible(prev => !prev);
	};

	return {
		value,
		errors,
		isVisible,
		setIsVisible,
		togglePasswordVisibility,
	};
};

type InputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	icon?: string;
	type?: 'password';
};

export const HookFormInput = <T extends FieldValues>({
	name,
	icon,
	control,
	type,
}: InputProps<T>) => {
	const {value, errors, isVisible, togglePasswordVisibility} = useHookFormInput({name, control});

	return (
		<>
			<div
				className={`flexCenter w-full gap-2 border-b-2 p-3 transition-colors duration-200 focus-within:border-additional3`}
			>
				<i
					className={`ri-${icon} ri-lg ${value ? 'animate-tickle text-black' : 'text-slate-400'}`}
				/>

				<Controller
					name={name}
					control={control}
					render={({field}) => (
						<input
							{...field}
							className="flex-grow text-xs outline-none"
							placeholder={name}
							type={type === 'password' && !isVisible ? 'password' : 'text'}
						/>
					)}
				/>
				{type === 'password' && (
					<i
						onClick={togglePasswordVisibility}
						className={`ri-${isVisible ? 'eye' : 'eye-off'}-fill ri-lg cursor-pointer ${
							isVisible ? 'text-black' : 'text-slate-400 '
						} transition-colors `}
					/>
				)}
			</div>
			{errors[name] && <p className="warning animate-shake">{(errors[name] as any).message}</p>}
		</>
	);
};
