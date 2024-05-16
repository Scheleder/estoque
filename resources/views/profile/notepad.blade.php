
<x-app-layout>

    <article class="mx-8 p-2 mt-12 sm:mt-1 rounded-xl bg-claro dark:bg-gray-600 shadow-lg hover:shadow-xl text-center">
        <span class="text-xl text-cor-70 dark:text-gray-300">{{ __('NOTEPAD') }}</span>
        <form id="form" method="post" action="{{ route('notes.update') }}">
            @csrf
            @method('patch')
            <textarea name="notes" id="notes" hidden></textarea>
            <div contenteditable id="text" onblur="save()" class="mt-2 text-left bg-cinza-claro text-cor-60 text-xl min-h-[300px] w-full p-4 rounded-md focus:outline-none">
                <pre>{{auth()->user()->configuration->notes}}</pre>
            </div>
        </form>
    </article>

    <script>
        function save(){
            text = document.getElementById('text').innerText;
            document.getElementById('notes').value = text;
            document.getElementById('form').submit();
        }
    </script>

</x-app-layout>
