import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";

interface JoinChallengeProps {
    stake: string;
    id: number;
}

const JoinChallenge = ({ stake, id }: JoinChallengeProps) => {
    const { data: contractData } = useDeployedContractInfo("YourContract");
    const { writeAsync: join } = useScaffoldMultiWriteContract({
        calls: [
            {
                contractName: "Eth",
                functionName: "approve",
                args: [contractData?.address ?? "", Number(stake)],
            },
            {
                contractName: "YourContract",
                functionName: "join_challenge",
                args: [Number(id)],
            },
        ],
    });

    const wrapInTryCatch =
        (fn: () => Promise<any>, errorMessageFnDescription: string) => async () => {
            try {
                await fn();
            } catch (error) {
                console.error(
                    `Error calling ${errorMessageFnDescription} function`,
                    error,
                );
            }
        };

    return (
        <button
            className="bg-[#FFB1AC] py-1 px-5 rounded-full shadow-md"
            onClick={wrapInTryCatch(join, "join")}
        >
            join
        </button>
    )
};

export default JoinChallenge;