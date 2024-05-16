<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Profile Theme') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Change your theme.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div class="w-full mb-6 group">
            <select id="theme" name="theme"
                class="block py-2.5 px-3 w-full text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option class="py-1" value="dark"  {{ $user->configuration->dark ? 'selected' : ''}}>Dark</option>
                    <option class="py-1" value="light" {{ $user->configuration->dark ? '' : 'selected'}}>Light</option>
            </select>
        </div>


        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('Save') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
