// Applies array of where clauses: [{ field: 'status', op: '==', value: 'active' }]
const applyWhere = (queryRef, constraints = []) => {
  let q = queryRef;
  constraints.forEach(c => {
    if (c.field && c.op && c.value !== undefined) {
      q = q.where(c.field, c.op, c.value);
    }
  });
  return q;
};

// Applies array of order clauses: [{ field: 'createdAt', direction: 'desc' }]
const applyOrderBy = (queryRef, sorts = []) => {
  let q = queryRef;
  sorts.forEach(s => {
    if (s.field) {
      q = q.orderBy(s.field, s.direction || 'asc');
    }
  });
  return q;
};

// Applies pagination limits and cursors
const applyPagination = (queryRef, limit, startAfterDoc) => {
  let q = queryRef;
  if (limit) q = q.limit(limit);
  if (startAfterDoc) q = q.startAfter(startAfterDoc);
  return q;
};

// Master query builder combining all abstractions
const buildQuery = (collectionRef, { where = [], orderBy = [], limit, startAfterDoc } = {}) => {
  let q = collectionRef;
  q = applyWhere(q, where);
  q = applyOrderBy(q, orderBy);
  q = applyPagination(q, limit, startAfterDoc);
  return q;
};

module.exports = {
  applyWhere,
  applyOrderBy,
  applyPagination,
  buildQuery
};
