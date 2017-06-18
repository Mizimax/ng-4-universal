export class Article{
    name: string
    topic: string
    content: string
    created_by: string
    pic: string
    comment: Comment
    created_at: Date
    updated_at: Date
}

export class Comment{
    comment: string
    created_by: string
    created_at: Date
    updated_at: Date
}