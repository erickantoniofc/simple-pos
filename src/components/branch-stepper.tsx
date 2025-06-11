import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Building2, Store, ChevronsUpDown, CheckCircle, ArrowLeft } from "lucide-react";
import { type RootState } from "@/store/store";
import { setActiveBranch, setActivePos } from "@/store/pos/branch-slice";
import { cn } from "@/lib/utils";

export const BranchStepper = () => {
  const dispatch = useDispatch();
  const { branches, activeBranch, activePos } = useSelector((state: RootState) => state.branches);

  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [tempBranchId, setTempBranchId] = useState<string | null>(null);

  const selectedBranch = branches.find(b => b.id === tempBranchId) || activeBranch;

  const handleSelectBranch = (branchId: string) => {
    setTempBranchId(branchId);
    setStep(2);
  };

  const handleSelectPos = (posId: string) => {
    const branch = selectedBranch;
    const pos = branch?.posPoints.find(p => p.id === posId);
    if (branch && pos) {
      dispatch(setActiveBranch(branch));
      dispatch(setActivePos(pos));
      setExpanded(false);
      setStep(1);
      setTempBranchId(null);
    }
  };

  return (
    <div className="w-full text-left bg-muted rounded-lg px-3 pt-3 pb-2 space-y-2 shadow-inner">
      {/* Botón principal */}
      <div
        className="w-full cursor-pointer hover:bg-muted/80 rounded-md px-2 py-1 transition"
        onClick={() => setExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="size-4" />
          <span>{activeBranch.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Store className="size-4" />
          <span>{activePos.name}</span>
        </div>
        <div className="flex justify-end">
          <ChevronsUpDown className="size-4 opacity-50" />
        </div>
      </div>

      {/* Stepper expandido hacia arriba */}
      {expanded && (
        <div className="space-y-2 border-t border-border pt-3 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-xs font-medium text-muted-foreground">
            Paso {step}: {step === 1 ? "Selecciona sucursal" : "Selecciona punto de venta"}
          </p>

          {step === 1 &&
            branches.map(branch => (
              <div
                key={branch.id}
                className={cn(
                  "w-full text-sm px-2 py-1 rounded-md hover:bg-muted/70 cursor-pointer flex justify-between items-center transition",
                  branch.id === activeBranch.id && "text-primary font-semibold"
                )}
                onClick={() => handleSelectBranch(branch.id)}
              >
                {branch.name}
                {branch.id === activeBranch.id && <CheckCircle className="ml-auto size-4" />}
              </div>
            ))}

          {step === 2 &&
            selectedBranch?.posPoints
              .filter(p => (p as any).active !== false)
              .map(pos => (
                <div
                  key={pos.id}
                  className="w-full text-sm px-2 py-1 rounded-md hover:bg-muted/70 cursor-pointer flex items-center transition"
                  onClick={() => handleSelectPos(pos.id)}
                >
                  {pos.name}
                </div>
              ))}

          {step === 2 && (
            <div
              className="text-xs text-muted-foreground flex items-center gap-1 hover:underline cursor-pointer pl-2 pt-1"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="size-3" /> Volver a sucursales
            </div>
          )}
        </div>
      )}
    </div>
  );
};