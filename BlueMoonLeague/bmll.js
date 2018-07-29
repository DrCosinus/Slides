var ETeam =
{
    AQUA:   0,
    BUKA:   1,
    FLIT:   2,
    HOAX:   3,
    KHIND:  4,
    MIMIX:  5,
    PILLAR: 6,
    TERRAH: 7,
    VULCA:  8,
    forEach: function(cb)
    {
        for(var key in this)
        {
            if (typeof this[key]==="number")
                cb(this[key]);
        }
    }
};

const teamInfoMap =
{
    0: "Aqua",
    1: "Buka",
    2: "Flit",
    3: "Hoax",
    4: "Khind",
    5: "Mimix",
    6: "Pillar",
    7: "Terrah",
    8: "Vulca"
};

function getTeamName(team)
{
    return teamInfoMap[team];
}

var matches =
[
    { homeTeam: ETeam.MIMIX, awayTeam: ETeam.TERRAH, homeScore: 0, awayScore: 3 },
    { homeTeam: ETeam.KHIND, awayTeam: ETeam.AQUA, homeScore: 1, awayScore: 0 },
    { homeTeam: ETeam.HOAX, awayTeam: ETeam.PILLAR, homeScore: 4, awayScore: 0 },
    { homeTeam: ETeam.FLIT, awayTeam: ETeam.VULCA, homeScore: 0, awayScore: 4 },
];

HTMLElement.prototype.clear = function() { this.innerHTML = ""; return this; };
HTMLElement.prototype.html = function(content) { this.innerHTML = content; return this; };
HTMLElement.prototype.child = function(tagName, fun) { let child = document.createElement(tagName); this.appendChild(child); fun(child); return this; };
HTMLElement.prototype.parseArray = function(array, fun) { let THIS = this; array.forEach(function(value) { fun(THIS, value); }); return this; };

document.querySelector("div#matches")
.parseArray(matches,function(parentElement, match)
{
    parentElement.child("div", div =>
    {
        div.child("span", sp => { sp.html(getTeamName(match.homeTeam)).classList.add(getTeamName(match.homeTeam)) } )
        div.child("span", sp => sp.html(match.homeScore) )
        div.child("span", sp => sp.html(match.awayScore) )
        div.child("span", sp => sp.html(getTeamName(match.awayTeam)).classList.add(getTeamName(match.awayTeam)) )
    })
});

// { teamID: , played, dif: , pts: }
var teamScores = [];

ETeam.forEach(function(val)
{
    teamScores[val] = { teamID: val, played: 0, dif: 0, pts: 0};
})

matches.forEach(function(match)
{
    var difLocalMinusAway = match.homeScore - match.awayScore;
    teamScores[match.homeTeam].played++;
    teamScores[match.homeTeam].dif += difLocalMinusAway;
    teamScores[match.homeTeam].pts += (difLocalMinusAway > 0 ? 3 : (difLocalMinusAway == 0 ? 1 : 0));

    teamScores[match.awayTeam].played++;
    teamScores[match.awayTeam].dif += -difLocalMinusAway;
    teamScores[match.awayTeam].pts += (difLocalMinusAway > 0 ? 0 : (difLocalMinusAway == 0 ? 1 : 3));
});

teamScores.sort(function(a,b)
{
    if ( a.pts != b.pts ) return b.pts-a.pts;
    if ( a.dif != b.dif ) return b.dif-a.dif;
    return a.teamID - b.teamID;
});

document.querySelector("div#classement table tbody")
    .parseArray(teamScores, function(parentElement, ts)
    {
        parentElement.child("tr", row =>
        {
            row.child("td", cell => cell.html(getTeamName(ts.teamID)));
            row.child("td", cell => cell.html(ts.played));
            row.child("td", cell => cell.html(ts.dif));
            row.child("td", cell => cell.html(ts.pts));

        });
    });
