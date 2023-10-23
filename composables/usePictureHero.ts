export default function (id: number) {
    return useSupabaseClient()
        .storage.from("heroes")
        .getPublicUrl(`${id}.jpg`)
        .data
        .publicUrl;
}