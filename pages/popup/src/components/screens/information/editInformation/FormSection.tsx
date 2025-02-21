const FormSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className=" flex flex-col gap-2 p-3 bg-neutral01 rounded-2xl">
    <h4 className="text-sm font-semibold ">{title}</h4>
    {children}
  </div>
);

export default FormSection;
