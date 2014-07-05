module.exports = function(app) {
  var comments = [
    { "author": "Brent Ertz", "text": "I like your __moves__!" },
    { "author": "Lea Ertz", "text": "I like your *style*!" }
  ];

  app.get('/api/comments', function(req, res) {
    res.json(comments);
  });

  app.post('/api/comments', function(req, res) {
    comments.push(req.body);
    res.json(comments);
  });
};
