<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Application Options') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Update your application options.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div class="w-full mb-6 group">
            <select id="options" name="options"
                class="block py-2.5 px-3 w-full text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option class="py-1" value="1"  {{ !$user->configuration->product && !$user->configuration->stock ? 'selected' : ''}}>Simples</option>
                    <option class="py-1" value="2" {{ $user->configuration->product && !$user->configuration->stock ? 'selected' : ''}}>Com produtos</option>
                    <option class="py-1" value="3" {{ $user->configuration->product && $user->configuration->stock ? 'selected' : ''}}>Com produtos e estoque</option>
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
