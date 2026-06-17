export type ApiSuccessResponse<T> = {
    data: T;
    message: string;
    success: true;
};

export type PaginatedMeta = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
};

export type PaginatedResult<T> = {
    items: T[];
    meta: PaginatedMeta;
};

export type PaginationParams = {
    limit?: number;
    order?: "asc" | "desc";
    page?: number;
    search?: string;
    sortBy?: string;
};

export type AuditFields = {
    active: boolean;
    createdAt: string;
    createdBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    updatedAt: string;
    updatedBy: string | null;
};
