module.exports = mongoose => {
  const UsersRep = mongoose.model(
    "UsersRep",
    mongoose.Schema(
      {
        username: String,
        listened: Array,
      }
    )
  )

  return UsersRep
}
