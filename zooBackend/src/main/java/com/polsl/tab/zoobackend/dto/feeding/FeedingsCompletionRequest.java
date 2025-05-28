package com.polsl.tab.zoobackend.dto.feeding;

import lombok.Data;

import java.util.List;

@Data
public class FeedingsCompletionRequest {
    private List<Long> feedingIds;
    private Boolean completed;
}
