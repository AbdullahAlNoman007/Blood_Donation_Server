type Tpagination = {
    page: string;
    limit: string;
    skip: number;
    sortBy: string;
    sortOrder: string;
}

const calculatePagination = (option: Partial<Tpagination>) => {

    const page = Number(option.page) || 1;
    const limit = Number(option.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = option.sortBy || "createdAt";
    const sortOrder = option.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }

}

export default calculatePagination