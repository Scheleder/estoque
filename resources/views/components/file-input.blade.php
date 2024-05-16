@props(['disabled' => false])

<input {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge([
    'class' => 'block w-full text-sm
    bg-secondary text-claro
    focus:border-cor-60 focus:ring-cor-60 rounded-xl shadow-sm
    file:mr-4 file:py-2 file:px-4
    file:rounded-xl file:border-0
    file:text-sm file:font-semibold
    file:bg-bege file:text-secondary
    hover:file:opacity-75 hover:file:text-cor-60'
    ]) !!} />
