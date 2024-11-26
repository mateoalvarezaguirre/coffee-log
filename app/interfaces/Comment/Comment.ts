export interface Comment {
    uid: string,
    blogId: string,
    content: string,
    userId: string,
    date: string,
    totalLikes: number,
    userImage: string | null,
    userName: string | null,
}