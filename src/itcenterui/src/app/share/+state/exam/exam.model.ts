export interface Exam{
    id: string;
    teacher_id:number;
    create_date:string;
    session_id:number;
    question_sum:number;
    question_start:number;
    question_end:number;
    request_percent:number;
    deadline:string;
}