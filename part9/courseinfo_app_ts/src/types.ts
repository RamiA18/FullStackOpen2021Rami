interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CoursePartRequirements extends CoursePartBaseDescription {
  type: "special";
  requirements: string[];
}

interface TotalInterface {
  total: number;
}

interface PartInterface {
  part: CoursePart;
}

interface ContentInterface {
  courseParts: CoursePart[];
}

interface HeaderInterface {
  name: string;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CoursePartRequirements;
export type TotalProps = TotalInterface;
export type PartProps = PartInterface;
export type ContentProps = ContentInterface;
export type HeaderProps = HeaderInterface;
