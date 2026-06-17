def analyze_business(business: dict):
    """
    Returns a list of improvement suggestions
    """
    suggestions = []

    # Website missing
    if not business.get("website"):
        suggestions.append({
            "field": "website",
            "title": "Website is missing",
            "reason": (
                "A website increases customer trust and helps your business "
                "rank higher on Google search."
            ),
            "action": "Add website now"
        })

    # Category missing
    if not business.get("category"):
        suggestions.append({
            "field": "category",
            "title": "Category is missing",
            "reason": (
                "Category helps customers find you when they search "
                "for services near them."
            ),
            "action": "Add category"
        })

    # Low reviews
    if business.get("reviews_count", 0) < 5:
        suggestions.append({
            "field": "reviews",
            "title": "Very few reviews",
            "reason": (
                "Businesses with more reviews get more calls and visits."
            ),
            "action": "Learn how to get more reviews"
        })

    return suggestions
