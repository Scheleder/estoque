@props(['disabled' => false])

<input {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge([
    'class' => 'border-cinza-claro dark:border-cinza
    bg-bege dark:bg-cinza-escuro
    text-cor-70 dark:text-cinza-claro
    focus:border-cor-70 dark:focus:border-cinza-claro
    focus:ring-cor-70 dark:focus:ring-cinza-claro
    rounded-md shadow-sm'
    ]) !!}>
