interface BuscadorProps {
  filterFn: (value: string) => void;
}

export const Buscador = ({ filterFn }: BuscadorProps) => {
  return (
    <>
      <div className="mt-2">
        <input
          onChange={(e) => filterFn(e.target.value)}
          type="text"
          name="search"
          className="block w-full rounded-md border-0 py-1.5 text-rose-900 shadow-sm ring-inset ring-rose-500 placeholder:text-rose-400 focus:ring-2  focus:ring-rose-600 sm:text-sm sm:leading-6 px-4 focus:border-0 font-bold"
          placeholder="Buscar Pokemon..."
        />
      </div>
    </>
  );
};
