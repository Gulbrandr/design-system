export interface stringMatchProps {
  label: string;
  search: string;
}

/**
 * Function that can be used to find a substring inside another string.
 * It needs two strings, the second one will be used in a Regex expression
 * to be matched to the first one.
 * The function will return an object containing the match, what comes before the match,
 * and what comes after the match in the base string
 *
 *
 */
export const StringMatch = ({ label, search }: stringMatchProps) => {
  const matchResult = { before: '', match: '', after: '' };

  const regex = new RegExp(
    `(?<before>.*?)(?<match>${search})(?<after>.*)`,
    'i'
  );

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matches: any = label.match(regex);

  if (matches) {
    matchResult.before = matches.groups.before;
    matchResult.match = matches.groups.match;
    matchResult.after = matches.groups.after;
    return (
      <div className="flex w-full gap-0.5">
        <p>{matchResult.before}</p>
        <strong>{matchResult.match}</strong>
        <p>{matchResult.after}</p>
      </div>
    );
  }
  return <>{label}</>;
};

export default StringMatch;
